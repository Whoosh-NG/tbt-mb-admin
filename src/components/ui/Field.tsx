export type Fieldprops = {
  title?: string;
  value?: string | number;
  className?: string;
  containerClassName?: string;
  fileSize?: number;
};

export default function Field({ title, value = "", className }: Fieldprops) {
  return (
    <div className={`space-y-1 ${className ? className : ""}`}>
      <p className="text-xs capitalize text-Grey6">{title}</p>
      <p className="text-base capitalize">{value}</p>
    </div>
  );
}
