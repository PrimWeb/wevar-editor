import { useRouter } from 'next/router'

const Restaurants = () => {
    const router = useRouter();
    const { id, path } = router.query;
    console.log(path);
    const [ menuType, menuId, menuCategori ] = path;
    return (<>
        <h1>Id: {id}</h1>
        <h1>Path: {typeof path !== "string" ? path?.join('/') : path}</h1>
        <h2>{menuType}</h2>
        <h2>{menuId}</h2>
        <h2>{menuCategori}</h2>
    </>)
};

export default Restaurants
