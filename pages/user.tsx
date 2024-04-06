import { useRouter } from 'next/router';

const UserPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>User Page</h1>
            <p>ID: {id}</p>
        </div>
    );
};

export default UserPage;