export default function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log("req", req);
  console.log("res", res);

  return {
    props: {
      username: "Max",
    },
  };
}

/**
 *
 * В getServerSideProps имаме пълен достъп до самият request, за тазлика от getStaticProps.
 *
 */
