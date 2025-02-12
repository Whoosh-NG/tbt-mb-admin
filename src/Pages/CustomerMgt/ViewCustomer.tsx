import GoBackBtn from "@/components/ui/GoBackBtn";

import { useGetUserByIdQuery } from "@/api/apiSlice";

import { useParams } from "react-router-dom";

import Field from "@/components/ui/Field";
import { formatNumInThousands } from "@/Utils/helpers";
import Skeleton from "react-loading-skeleton";

const ViewCustomer = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserByIdQuery(id as string, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const address = `${data?.data?.address ?? "N/A"}, ${data?.data?.city?.name ?? "N/A"}, ${data?.data?.state?.name ?? "N/A"}`;

  if (isLoading) {
    return (
      <article className="container space-y-3 py-10">
        <Skeleton height={150} count={3} />
      </article>
    );
  }

  return (
    <main className="container my-10">
      <header className="mb-7 flex items-center gap-2">
        <GoBackBtn className="outline-btn" />
        <h3>View Customer</h3>
      </header>

      <section className="card grid grid-cols-1 justify-between gap-4 py-5 lg:grid-cols-3">
        <Field
          className="col-span-2 pl-5"
          title="Customer Type"
          value={data?.data?.user_type}
        />
        <Field
          className="pl-5"
          title="Wallet Balance"
          value={`₦${formatNumInThousands(data?.data?.wallet)}`}
        />
        <Field
          className="pl-5"
          title="Full Name"
          value={`${data?.data?.first_name} ${data?.data?.last_name} `}
        />
        <Field className="pl-5" title="Email" value={data?.data?.email} />
        <Field
          className="pl-5"
          title="Phone Number"
          value={data?.data?.phone_number}
        />
        <Field
          className="pl-5"
          title="Address"
          value={address ? address : "N/A"}
        />
        <Field
          className="pl-5"
          title="Referral Code"
          value={data?.data?.referral_code ?? "N/A"}
        />
      </section>
    </main>
  );
};

export default ViewCustomer;
