type ProfilePageProps = {
    params: {
        id: string;
    };
};

export default function ProfilePage({ params }: ProfilePageProps) {
    return <div>{params.id}</div>;
}
