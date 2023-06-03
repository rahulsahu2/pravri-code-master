
export const backendToFrontend = (backendUser)=>{
    console.log(backendUser);
    var frontendObj =  {
        "id": backendUser.id,
        "roles": [
            (backendUser.role).userlevel
        ],
        "active": backendUser.active,
        "merchantUserId": backendUser.merchantUserId || "",
        "email": backendUser.email,
        "user": {
            "email": backendUser.email,
            "username": backendUser.username,
            "role": JSON.parse(backendUser.role).userlevel,
            "mobile": backendUser.mobile,
            "fullname":backendUser.fullname
        },
        "permissions": backendUser.permissions,
        "profileImg":backendUser.profileImg,
        "others":backendUser.others    
    }

    return frontendObj;
}