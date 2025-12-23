import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GroupedSelectProps {
  placeholder: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: Record<string, (string | number)[]>;
  className?: string;
}

const GroupedSelect = ({
  placeholder,
  value,
  onValueChange,
  options,
  className,
}: GroupedSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([label, items]) => (
          <SelectGroup key={label}>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item} value={item.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GroupedSelect;
