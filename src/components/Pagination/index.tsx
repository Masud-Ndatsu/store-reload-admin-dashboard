interface Iprops {
  loading: boolean;
}

export const Pagination = ({ loading }: Iprops) => {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <button
        style={
          loading
            ? { padding: ".5rem .75rem" }
            : { border: "none", backgroundColor: "white" }
        }
      >
        Previous page
      </button>
      {1 + " to " + 3}
      <button style={{ padding: ".5rem .75rem" }}>Next page</button>
    </div>
  );
};
