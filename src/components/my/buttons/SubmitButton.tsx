import { Button } from "@/components/ui/button";

interface IProps {
  text?: string;
  loadingText?: string;
  isSubmitting: boolean;
}

export default function SubmitButton({
  text = "submit",
  loadingText = "...",
  isSubmitting,
}: IProps) {
  return <Button type="submit">{isSubmitting ? loadingText : text}</Button>;
}
