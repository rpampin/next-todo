import Layout from "../components/Layout";

export default function Index() {
  return (
    <Layout>
      <form action="api/todo" method="post">
        <input name="title" />
        <input name="notes" />
        <button type="submit">Save</button>
      </form>
    </Layout>
  );
}
