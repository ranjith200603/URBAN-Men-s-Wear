interface CategoryCardProps {
  title: string;
  image: string;
}

export default function CategoryCard({
  title,
  image,
}: CategoryCardProps) {
  return (
    <a
      href="#"
      className="group relative block h-[420px] overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute bottom-7 left-7 text-white">
        <p className="text-2xl font-bold">{title}</p>

        <p className="mt-2 text-sm opacity-70 transition group-hover:opacity-100">
          Shop now →
        </p>
      </div>
    </a>
  );
}