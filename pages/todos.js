import axios from "axios";
import Layout from "../components/Layout";

function Todos({ todos }) {
  return (
    <Layout>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Folder</th>
            <th scope="col">Todo</th>
            <th scope="col">Priority</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, index) => (
            <tr key={index}>
              <td>{item.folder.name}</td>
              <td>{item.title}</td>
              <td>{item.priority}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

Todos.getInitialProps = async ctx => {
  const res = await axios.get("/api/todo");
  return { todos: res.data };
};

export default Todos;
