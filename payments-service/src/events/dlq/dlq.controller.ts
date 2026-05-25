import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DlqService } from './dlq.service';
import { DlqMessage, DlqStats } from './dlq.interface';

@Controller('dlq')
export class DlqController {
  private readonly logger = new Logger(DlqController.name);

  constructor(private readonly dlqService: DlqService) {}

  /**
   * Get /dlq/stats
   * @returns  Retorna estatistica da DLQ
   */

  @Get('stats')
  async getStatus(): Promise<DlqStats> {
    try {
      return await this.dlqService.getStats();
    } catch (error) {
      this.logger.error('Failed to get DLQ stats', error);
      throw new HttpException(
        'Failed to get DLQ stats',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get /dlq/messages
   * @returns  Retorna as mensagem da DLQ (sem remover)
   */

  @Get('messagaes')
  async getMessager(
    @Query('limit') limit?: string,
  ): Promise<{ count: number; messages: DlqMessage[] }> {
    try {
      const parsedLimit = limit ? parseInt(limit, 10) : 10;
      const messages = await this.dlqService.peekMessage(parsedLimit);

      return {
        count: messages.length,
        messages,
      };
    } catch (error) {
      this.logger.error('Failed to get DLQ messages', error);
      throw new HttpException(
        'Failed to get DLQ messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Post /dlq/reprocess/:orderId
   * Reprocessa uma mensagem especifica
   */

  @Post('reprocess/:orderId')
  async reprocessMessage(
    @Param('orderId') orderId: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const found = await this.dlqService.reprocessMessage(orderId);

      if (!found) {
        throw new HttpException(
          `Message with orderId ${orderId} not found in DLQ`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        message: `Message ${orderId} sent back to main queue for reprocessing`,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Failed to reprocess message ${orderId}:`, error);
      throw new HttpException(
        `Failed to reprocess message ${orderId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST /dlq/reprocess-all
   * @returns Reprocessa toda as mensagens da DLQ
   */

  @Post('reprocess-all')
  async reprocessAll(): Promise<{
    success: boolean;
    processed: number;
    failed: number;
  }> {
    try {
      const result = await this.dlqService.reprocessAll();

      return {
        success: true,
        ...result,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Failed to reprocess all messages', error);
      throw new HttpException(
        'Failed to reprocess all messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * DELETE /dlq/messages/:orderId
   * Remove uma mensagem da DLQ (descarta permanentemente)
   * @param orderId 1
   * @returns Retorna success como true ou uma message de sucesso
   */

  @Delete('message/:orderId')
  async deleteMessage(
    @Param('orderId') orderId: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const found = await this.dlqService.discardMessage(orderId);

      if (!found) {
        throw new HttpException(
          `Message with orderId ${orderId} not found in DLQ`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        message: `Message ${orderId} permanently deleted from DLQ`,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Failed to delete message ${orderId}`, error);
      throw new HttpException(
        `Failed to delete message ${orderId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * DELETE /dlq/purge
   * Remove TODAS as mensagens da DLQ (CUIDADO !)
   */
  @Delete('purge')
  async purgeAll(): Promise<{ success: boolean; purgedCount: number }> {
    try {
      const count = await this.dlqService.purgeAll();

      return {
        success: true,
        purgedCount: count,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Failed to purge DLQ:', error);
      throw new HttpException(
        'Failed to purge DLQ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
