import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image
          alt="logo"
          fill
          src="/line.png"
          className="object-contain"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        NuralNet is working...
      </p>
    </div>
  );
};

export default Loader;
