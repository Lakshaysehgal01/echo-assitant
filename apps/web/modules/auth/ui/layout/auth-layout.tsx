export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center h-full">
      {children}
    </div>
  );
};
