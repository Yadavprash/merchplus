import { usePathname } from 'next/navigation';

export default function RouteName() {
  const path = usePathname();
//   const currentRoute = rou;

  return (
    <div>
      <p>Current Route: {path}</p>
    </div>
  );
}
