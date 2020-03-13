import React from "react";
import Layout from "../../components/Layout";
import TodoForm from "../../components/TodoForm";

export default function Create() {
  return (
    <Layout>
      <h2>Create Todo</h2>
      <TodoForm />
    </Layout>
  );
}
