import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { mockAddresses } from "@/mocks";
import { ProfileContainer, PasswordContainer } from "@/modules/user";
import { ListAddressContainer } from "@/modules/address";
import type { Address } from "@/modules/address";
import type { AddressFormValues } from "@/modules/address";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);

  if (!user) return null;

  function handleCreate(values: AddressFormValues) {
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      ...values,
    };
    if (newAddress.isDefault) {
      setAddresses((prev) => [
        ...prev.map((a) => ({ ...a, isDefault: false })),
        newAddress,
      ]);
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }
  }

  function handleUpdate(id: string, values: AddressFormValues) {
    setAddresses((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...values } : a));
      if (values.isDefault) {
        return updated.map((a) => ({ ...a, isDefault: a.id === id }));
      }
      return updated;
    });
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary text-xl text-primary-foreground">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Dados pessoais</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileContainer user={user} />
        </TabsContent>

        <TabsContent value="addresses">
          <ListAddressContainer
            addresses={addresses}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="security">
          <PasswordContainer />
        </TabsContent>
      </Tabs>
    </div>
  );
}
