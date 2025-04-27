import { Badge, Tooltip } from "flowbite-react";
import { useGameStore } from "@/store/gameStore";

export function BadgeComponent() {
  const { envButtons, statusButtons } = useGameStore();
  return (
    <div className="flex flex-wrap gap-2">
      <Tooltip content={"Coleta Atual: " + envButtons.A}>
        <Badge color="red" size="sm" className={statusButtons.A ? "" : "hidden"}>
          {envButtons.A}
        </Badge>
      </Tooltip>
      <Tooltip content={"Coleta Atual: " + envButtons.B}>
        <Badge color="yellow" size="sm" className={statusButtons.B ? "" : "hidden"}>
          {envButtons.B}
        </Badge>
      </Tooltip>
      <Tooltip content={"Coleta Atual: " + envButtons.X}>
        <Badge color="blue" size="sm" className={statusButtons.X ? "" : "hidden"}>
          {envButtons.X}
        </Badge>
      </Tooltip>
      <Tooltip content={"Coleta Atual: " + envButtons.Y}>
        <Badge color="success" size="sm" className={statusButtons.Y ? "" : "hidden"}>
          {envButtons.Y}
        </Badge>
      </Tooltip>
    </div>
  );
}
