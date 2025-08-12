import ComponentWrapper from "../component-wrapper";
import Heading from "../heading";
import { cn } from "@/lib/utils";
import { ArrowRight, Crown } from "lucide-react";

function ButtonPage() {
  return (
    <div className="mb-12 flex flex-col gap-10">
      <Heading paragraph="Find all sorts of buttons for your mobile app.">
        Button
      </Heading>

      <div className="flex flex-col gap-10">
        <ComponentWrapper
          heading="Duolingo Button"
          codeExample={duolingoButtonCode}
        >
          <div className="flex flex-col gap-4 pt-16">
            <DuolingoButton>Try for 0,00 US$</DuolingoButton>
            <DuolingoButton variant="secondary">Get other app</DuolingoButton>
            <DuolingoButton variant="ghost">No thanks</DuolingoButton>
          </div>
        </ComponentWrapper>
        <ComponentWrapper
          heading="Premium Button"
          codeExample={premiumButtonCode}
        >
          <div className="flex flex-col gap-4 pt-16">
            <PremiumButton>Unlock Premium Features</PremiumButton>
            <PremiumButton variant="secondary">
              Unlock Premium Features
            </PremiumButton>
          </div>
        </ComponentWrapper>
        <ComponentWrapper heading="Pill Button" codeExample={premiumButtonCode}>
          <div className="flex flex-col gap-4 pt-16">
            <PillButton>Get started now</PillButton>
            <PillButton variant="secondary">Check prices first</PillButton>
            <PillButton variant="ghost">Go away</PillButton>
          </div>
        </ComponentWrapper>
      </div>
    </div>
  );
}

export default ButtonPage;

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function DuolingoButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  let defaultClasses =
    "relative w-full uppercase max-w-md cursor-pointer rounded-lg px-4 py-3 font-[700]";

  const variantClasses = {
    primary:
      "bg-indigo-700 text-white shadow-[0_4px_0_#1e1a4d] active:translate-y-[2px] active:shadow-none",
    secondary:
      "bg-orange-500 text-white shadow-[0_4px_0_#ca3500] active:translate-y-[2px] active:shadow-none",
    ghost: "text-indigo-700",
  };
  return (
    <button
      className={cn(defaultClasses, variantClasses[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

const duolingoButtonCode = `import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function DuolingoButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  let defaultClasses =
    "relative w-full uppercase max-w-md cursor-pointer rounded-lg px-4 py-3 font-[700]";

  const variantClasses = {
    primary:
      "bg-indigo-700 text-white shadow-[0_4px_0_#1e1a4d] active:translate-y-[2px] active:shadow-none",
    secondary:
      "bg-orange-500 text-white shadow-[0_4px_0_#ca3500] active:translate-y-[2px] active:shadow-none",
    ghost: "text-indigo-700",
  };
  return (
    <button
      className={cn(defaultClasses, variantClasses[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}`;

function PremiumButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  let defaultClasses = `flex items-center cursor-pointer active:scale-[0.95] transition-transform duration-300 justify-center gap-3 rounded-xl px-4 py-6 text-xl font-[500] text-white`;

  const variantClasses = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600 text-white",
    secondary: "bg-gradient-to-b from-orange-500 to-orange-600 text-white",
    ghost: "",
  };

  return (
    <button
      className={cn(defaultClasses, variantClasses[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <Crown size={26} className="text-yellow-400" />
      {children}
    </button>
  );
}

const premiumButtonCode = `import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function PremiumButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  let defaultClasses = \`flex items-center cursor-pointer active:scale-[0.95] transition-transform duration-300 justify-center gap-3 rounded-xl px-4 py-6 text-xl font-[500] text-white\`;

  const variantClasses = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600 text-white",
    secondary: "bg-gradient-to-b from-orange-500 to-orange-600 text-white",
    ghost: "",
  };

  return (
    <button
      className={cn(defaultClasses, variantClasses[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <Crown size={26} className="text-yellow-400" />
      {children}
    </button>
  );
}`;

function PillButton({
  children,
  icon = <ArrowRight size={18} />,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps & { icon?: React.ReactNode }) {
  let base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-md active:scale-[0.97] transition-all";

  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500",
    secondary: "bg-gradient-to-r from-orange-500 to-pink-500",
    ghost: "bg-gray-200 text-gray-800",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
      {icon}
    </button>
  );
}

function AppleButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  let defaultClasses =
    "relative w-full max-w-md cursor-pointer rounded-sm px-4 py-3 font-[500]";

  const variantClasses = {
    primary: "bg-white text-black active:bg-gray-50",
    secondary: "",
    ghost: "",
  };
  return (
    <button
      className={cn(defaultClasses, variantClasses[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
