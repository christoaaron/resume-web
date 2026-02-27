import { getProfile } from "@/lib/data";
import { ProfileForm } from "./profile-form";

export default async function AdminProfilePage() {
    const profile = await getProfile();

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <ProfileForm initialData={profile} />
        </div>
    );
}
