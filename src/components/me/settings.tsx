import { ModeToggle } from "@/components/common/mode-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Settings() {
  return (
    <Card className="mt-4 h-fit w-full">
      <CardHeader>
        <CardTitle className="scroll-m-20 font-serif text-2xl font-semibold tracking-wide">
          Preferensi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ModeToggle isCollapsed={false} />
      </CardContent>
    </Card>
  );
}
