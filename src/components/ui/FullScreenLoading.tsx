export const FullScreenLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-xl font-medium mt-6">Espere un momento...</p>
      </div>
    </div>
  );
};
