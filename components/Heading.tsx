function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[44px] leading-[60px] font-[700] md:text-[74px] md:leading-[91px]">
      {children}
    </h1>
  );
}

export default Heading;
