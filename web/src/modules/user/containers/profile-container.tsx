import { toast } from "sonner";
import { ProfileForm } from "../components/profile-form";
import type { ProfileFormValues } from "../components/profile-form/schema";
import type { User } from "../schemas";

type ProfileContainerProps = {
  user: User;
  onSubmit?: (values: ProfileFormValues) => void;
  isSubmitting?: boolean;
};

export function ProfileContainer({ user, onSubmit, isSubmitting }: ProfileContainerProps) {
  function handleSubmit(values: ProfileFormValues) {
    if (onSubmit) {
      onSubmit(values);
      return;
    }
    console.log("update profile:", values);
    toast.success("Perfil atualizado!");
  }

  return <ProfileForm user={user} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
