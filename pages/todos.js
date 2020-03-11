import Router from "next/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";

function Todos({ todos }) {
  function deleteTodo(todoId) {
    axios
      .delete(`/api/todo?id=${todoId}`)
      .then(res => Router.push("/todos"))
      .catch(err => console.log(err));
  }

  return (
    <Layout>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Folder</th>
            <th scope="col">Todo</th>
            <th scope="col">Priority</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, index) => (
            <tr key={index}>
              <td>{item.folder.name}</td>
              <td>{item.title}</td>
              <td>{item.priority}</td>
              <td>{item.date}</td>
              <td onClick={() => deleteTodo(item._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
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