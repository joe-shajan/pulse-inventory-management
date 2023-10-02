export default async function Page({ params }: any) {
  const { id } = params;

  console.log(id);

  return <div>shop users:{id}</div>;
}
