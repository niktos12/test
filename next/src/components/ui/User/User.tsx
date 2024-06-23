import { useAuth } from "@/app/hooks/useAuth";
interface IUser {
  fullname: string | undefined
  roles: Array<string>
}
export function User({ fullname, roles }: IUser){
  
    const { handleLogout } = useAuth();
    return (
      <div className="mt-auto p-5">
        <div className="flex space-x-2 mb-4">
          {roles.map((role: string,index) => {
            return (
              <span className="bg-gray-300 px-2 py-1 rounded text-sm" key={index}>
                {role}
              </span>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm w-40">{fullname}</div>
          <button onClick={handleLogout}>
            <p>Выход</p>
          </button>
        </div>
      </div>
    );
  };
  