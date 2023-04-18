import jwt from 'jsonwebtoken';

export async function AuthMiddleware(token: string): Promise<boolean> {
    if (!token) return false;
    const bearerToken = token.substring(4, token.length);

    let jwtVerifyPromiseResolver: (tokenValid: boolean) => void;
    const jwtVerifyPromise = new Promise<boolean>(resolve => {
        jwtVerifyPromiseResolver = resolve;
    });


    jwt.verify(bearerToken, process.env.JWT_SECRET, {}, (err, decodedJwt: any) => {
        let jwtValid: boolean = false;
        console.log(err, "verifying")
        if (err)
            jwtValid = false;            
        else {
            jwtValid = true;
        }
        
        jwtVerifyPromiseResolver(
            jwtValid
        );
    });

    return jwtVerifyPromise;
}