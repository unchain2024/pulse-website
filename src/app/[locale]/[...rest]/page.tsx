import { notFound } from "next/navigation";

// Resolve unknown URLs within the locale layout, which supplies <html>/<body>.
export default function UnknownPage() {
  notFound();
}
