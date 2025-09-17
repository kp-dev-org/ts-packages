import { networkInterfaces } from "os";

export function getCurrentIpAddress(): string | null {
    const interfaces = networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        const networkInterface = interfaces[name];
        if (networkInterface) {
            for (const net of networkInterface) {
                // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
                if (net.family === 'IPv4' && !net.internal) {
                    return net.address;
                }
            }
        }
    }
    return null;
}
