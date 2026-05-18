import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { promotionFormSchema, type PromotionFormValues } from "./schema";
import type { PromotionFormProps } from "./types";

const CATEGORY_OPTIONS = [
  { value: "DOG", label: "Cães" },
  { value: "CAT", label: "Gatos" },
  { value: "BIRD", label: "Aves" },
  { value: "FISH", label: "Peixes" },
  { value: "OTHER", label: "Outros" },
] as const;

export function PromotionForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: PromotionFormProps) {
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      targetType: "GENERAL",
      discountType: "PERCENT",
      discountValue: 10,
      startsAt: "",
      endsAt: "",
      bannerImage: "",
      active: true,
      ...defaultValues,
    },
  });

  const targetType = form.watch("targetType");
  const discountType = form.watch("discountType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Ração Premium 20% OFF" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva a promoção..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alvo da promoção</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-x-6 gap-y-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="PRODUCT" id="target-product" />
                    <Label htmlFor="target-product">Produto específico</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="CATEGORY" id="target-category" />
                    <Label htmlFor="target-category">Categoria inteira</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="GENERAL" id="target-general" />
                    <Label htmlFor="target-general">Geral</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {targetType === "PRODUCT" && (
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID do produto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: prod-1"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {targetType === "CATEGORY" && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de desconto</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="PERCENT" id="dt-percent" />
                      <Label htmlFor="dt-percent">Percentual (%)</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="FIXED" id="dt-fixed" />
                      <Label htmlFor="dt-fixed">Valor fixo (R$)</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discountValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor{" "}
                  {discountType === "PERCENT" ? "(%)" : "(R$)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={discountType === "PERCENT" ? 100 : undefined}
                    step={discountType === "PERCENT" ? 1 : 0.01}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="startsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de início</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de fim</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bannerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da imagem do banner</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://images.unsplash.com/..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!mt-0">Promoção ativa</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Salvando..." : "Salvar promoção"}
        </Button>
      </form>
    </Form>
  );
}
