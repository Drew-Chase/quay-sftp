export class Connection
{
    private readonly _id: string | null = null;
    private readonly _connectionName: string | null = null;
    private readonly _host: string = "";
    private readonly _port: number = 22;
    private readonly _username: string = "";
    private readonly _password: string | null = null;
    private readonly _keyfile: string | null = null;
    private readonly _secure: boolean = false;
    private readonly _timeout: number = 10000;
    private readonly _temp: boolean = true;
    private readonly _tags: string[] = [];
    private readonly _remotePath: string = "/";


    constructor(id: string | null, connectionName: string | null, host: string, port: number, username: string, password: string | null, keyfile: string | null, secure: boolean, timeout: number, temp: boolean, tags: string[], remotePath: string)
    {
        this._id = id;
        this._connectionName = connectionName;
        this._host = host;
        this._port = port;
        this._username = username;
        this._password = password;
        this._keyfile = keyfile;
        this._secure = secure;
        this._timeout = timeout;
        this._temp = temp;
        this._tags = tags;
        this._remotePath = remotePath;
    }

    get id(): string | null
    {
        return this._id;
    }

    get host(): string
    {
        return this._host;
    }

    get port(): number
    {
        return this._port;
    }

    get username(): string
    {
        return this._username;
    }

    get password(): string | null
    {
        return this._password;
    }

    get keyfile(): string | null
    {
        return this._keyfile;
    }

    get secure(): boolean
    {
        return this._secure;
    }

    get timeout(): number
    {
        return this._timeout;
    }

    get temp(): boolean
    {
        return this._temp;
    }

    get tags(): string[]
    {
        return this._tags;
    }

    get remotePath(): string
    {
        return this._remotePath;
    }

    get connectionName(): string
    {
        return this._connectionName ?? "Unnamed Connection";
    }

    /**
     * Establishes a connection to the ftp/sftp server.
     *
     * @return {Promise<void>} A promise that resolves when the connection is successfully established.
     */
    async connect(): Promise<void>
    {
        // TODO: Implement connection logic
        alert("unimplemented...");
    }

    /**
     * Fetches a list of all saved connections from the sqlite database.
     *
     * Retrieves connection data from a specified source.
     *
     * @return {Promise<Connection[]>} A promise that resolves to an array of Connection objects.
     */
    static async fetch(): Promise<Connection[]>
    {
        // TODO: Implement fetching connections logic
        return [
            new Connection("1", "Production Web Server", "sftp.example.com", 22, "user1", "pass123", null, true, 10000, false, ["production", "web"], "/var/www"),
            new Connection("2", "Staging FTP Server", "ftp.testserver.net", 21, "admin", null, "/path/to/key.pem", false, 15000, false, ["staging"], "/home/admin"),
            new Connection("3", "Secure Development Server", "secure.myserver.io", 22, "deploy", "secret456", null, true, 10000, true, ["dev", "temp"], "/opt/deploy"),
            new Connection("4", "Backup Storage", "backup.storage.com", 22, "backup_user", null, "/keys/backup.key", true, 20000, false, ["backup"], "/backups"),
            new Connection("5", "Local Development", "dev.localhost", 2222, "developer", "dev123", null, false, 5000, true, ["local", "dev"], "/home/dev"),
            new Connection("6", "Cloud Production Storage", "cloud.provider.com", 22, "cloud_admin", null, "/secure/cloud.pem", true, 10000, false, ["cloud", "production"], "/mnt/storage"),
            new Connection("7", "Legacy FTP Server", "legacy.oldserver.org", 21, "legacy", "old_pass", null, false, 30000, false, ["legacy"], "/var/ftp"),
            new Connection("8", "API Gateway Files", "api.gateway.net", 22, "api_user", "api_secret", null, true, 10000, false, ["api"], "/api/files"),
            new Connection("9", "Media CDN Storage", "media.cdn.io", 22, "media", null, "/certs/media.key", true, 10000, false, ["media", "cdn"], "/cdn/media"),
            new Connection("10", "Temporary Workspace", "temp.workspace.local", 22, "temp_user", "temp123", null, false, 10000, true, ["temp", "test"], "/tmp")
        ];
    }

    /**
     * Fetches a list of connections from the specified workspace.
     *
     * @param {string} _workspace_id - The unique identifier of the workspace to fetch connections from.
     * @return {Promise<Connection[]>} A promise that resolves to an array of Connection objects.
     */
    static async fetch_from_workspace(_workspace_id: string): Promise<Connection[]>
    {
        // TODO: Implement fetching connections logic
        alert("unimplemented...");
        return [];
    }

    /**
     * Fetches connections that are associated with the specified tags.
     *
     * @param {...string} _tags - A list of tags used to filter the connections.
     * @return {Promise<Connection[]>} A promise that resolves to an array of Connection objects matching the provided tags.
     */
    static async fetch_with_tags(..._tags: string[]): Promise<Connection[]>
    {
        // TODO: Implement fetching connections logic
        alert("unimplemented...");
        return [];
    }


}