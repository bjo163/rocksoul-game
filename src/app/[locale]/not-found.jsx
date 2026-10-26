import Link from "next/link";
export default function NotFound() {
 return <main id="main" className="page-wrap content-page"><p className="eyebrow">/// ERROR / 404</p><h1>SIGNAL NOT FOUND</h1><p>The page is unavailable or its story has not been released.</p><Link className="btn btn-primary" href="/id">RETURN HOME ↗</Link></main>;
}
