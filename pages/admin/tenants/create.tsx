import usePageTitle from "../../../hooks/usePageTitle";
import TenantForm from "../../../components/tenants/TenantForm";
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import { useRouter } from "next/router";
import useCreateTenant from "../../../hooks/tenants/useCreateTenant";
import ButtonBack from "../../../components/common/ButtonBack";

const AdminTenantsCreate = () => {
  usePageTitle({ title: "Create new tenant" });

  useHeaderButtons({
    id: "backToTenants",
    component: <ButtonBack text="Back to tenant list" action="/admin/tenants" />
  });

  const router = useRouter();
  const { createTenant } = useCreateTenant();

  // const { updateUserTenantRoles } = useUpdateUserTenantRoles()

  const handleSubmit = (values: any) => {
    createTenant(values, () => {});
    router.push("/admin/tenants");
  };

  return <TenantForm onSubmit={handleSubmit} />;
};

AdminTenantsCreate.navState = {
  topLevel: "tenants",
  secondary: "overview",
};

export default AdminTenantsCreate;
