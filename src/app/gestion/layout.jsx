import Header from './Header';
import Menu from './Menu';

export default function RootLayout({ children }) {
  return (
    <section className="main-view">
      <Header></Header>
      <Menu></Menu>
      <main className="section-view">{children}</main>
    </section>
  );
}
