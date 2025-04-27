import { Spinner } from "flowbite-react";

export function SpinnerComponent() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" color="warning" size="xl" />
      </div>
    </div>
  );
}
