export default function Input({ ...props }) {
  return (
    <input
      className="text-xl text
        bg-forest-mist text-forest-bark ring-0
        outline-0 rounded-4xl
        p-3 px-5 shadow-xl
        "
      {...props}
    />
  );
}
