
interface Props {
  title: string;
  subtitle?: string;
}

export const PageTitle = ({title, subtitle}: Props) => {
  return (
    <div>
      <h2 className="text-black text-lg font-bold">{title}</h2>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
};
