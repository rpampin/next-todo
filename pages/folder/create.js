import Layout from "../../components/Layout";

export default function Create() {
  return (
    <Layout>
      <form action="/api/folder" method="post" autoComplete="off">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="icon">Icon</label>
          <input className="form-control" id="icon" name="icon" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
}
