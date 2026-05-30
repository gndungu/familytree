interface Props {
  darkMode: boolean;
}

export default function GalleryHeader({
  darkMode,
}: Props) {
  return (
    <div className="mb-8 text-center">

      <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
        Family Gallery
      </h1>

      <p
        className={`mt-3 text-sm md:text-base max-w-2xl mx-auto ${
          darkMode
            ? 'text-slate-400'
            : 'text-slate-600'
        }`}
      >
        Preserving family memories, moments,
        celebrations, and generations.
      </p>
    </div>
  );
}