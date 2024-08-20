import { getModelList } from '@/api/photoApi';

export const getServerSideProps = async () => {
  try {
    const response = await getModelList();
    console.log('Response:', response);
    const modelList = response?.stocks || [];
    console.log(modelList);

    return {
      props: {
        modelList,
      }
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        modelList: [],
      }
    }
  }
}

export default function ModelList({ modelList }: ModelListProps) {
  console.log(modelList);
  // const modelList = getModelList() || [];
  // getModelList().then(resolve => console.log(resolve))
  return (
    <ul>
      {modelList?.length 
        ?
          modelList?.map((model) => (
            <li key={model.id}>
              {model.name} ({model.gender}) - Instagram: {model.instagram}
            </li>
          ))
        : <li>No Models List</li>
      }
    </ul>
  )  
  // getModelList()
  //     .then((resolve) => );
}