import type { Address } from "../../schemas";
import type { AddressFormValues } from "./schema";

export type AddressFormProps = {
  defaultValues?: Partial<Address>;
  onSubmit: (values: AddressFormValues) => void;
  isSubmitting?: boolean;
};
