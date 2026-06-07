import {TagOption, tagOptions} from "../components/TagOptions.tsx";

export enum ConnectionType
{
    FTP,
    SFTP,
    S3
}

export class Connection
{
    private readonly _id: string | null = null;
    private readonly _connectionName: string | null = null;
    private readonly _host: string = "";
    private readonly _port: number = 22;
    private readonly _username: string = "";
    private readonly _password: string | null = null;
    private readonly _keyfile: string | null = null;
    private readonly _timeout: number = 10000;
    private readonly _temp: boolean = true;
    private readonly _tag: TagOption | null = null;
    private readonly _remotePath: string = "/";
    private readonly _type: ConnectionType = ConnectionType.SFTP;


    constructor(id: string | null, connectionName: string | null, host: string, port: number, username: string, password: string | null, keyfile: string | null, timeout: number, temp: boolean, tag: TagOption | null, remotePath: string, type: ConnectionType)
    {
        this._id = id;
        this._connectionName = connectionName;
        this._host = host;
        this._port = port;
        this._username = username;
        this._password = password;
        this._keyfile = keyfile;
        this._timeout = timeout;
        this._temp = temp;
        this._tag = tag;
        this._remotePath = remotePath;
        this._type = type;
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


    get timeout(): number
    {
        return this._timeout;
    }

    get temp(): boolean
    {
        return this._temp;
    }

    get tag(): TagOption | null
    {
        return this._tag;
    }

    get type(): ConnectionType
    {
        return this._type;
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
            new Connection("1", "Production Web Server", "sftp.example.com", 22, "user1", "pass123", null, 10000, false, tagOptions[0], "/var/www", ConnectionType.SFTP),
            new Connection("2", "Staging FTP Server", "ftp.testserver.net", 21, "admin", null, "/path/to/key.pem", 15000, false, tagOptions[1], "/home/admin", ConnectionType.FTP),
            new Connection("3", "Secure Development Server", "secure.myserver.io", 22, "deploy", "secret456", null, 10000, true, null, "/opt/deploy", ConnectionType.SFTP),
            new Connection("4", "Backup Storage", "backup.storage.com", 22, "backup_user", null, "/keys/backup.key", 20000, false, null, "/backups", ConnectionType.S3),
            new Connection("5", "Local Development", "dev.localhost", 2222, "developer", "dev123", null, 5000, true, tagOptions[2], "/home/dev", ConnectionType.SFTP),
            new Connection("6", "Cloud Production Storage", "cloud.provider.com", 22, "cloud_admin", null, "/secure/cloud.pem", 10000, false, tagOptions[0], "/mnt/storage", ConnectionType.S3),
            new Connection("7", "Legacy FTP Server", "legacy.oldserver.org", 21, "legacy", "old_pass", null, 30000, false, tagOptions[3], "/var/ftp", ConnectionType.FTP),
            new Connection("8", "API Gateway Files", "api.gateway.net", 22, "api_user", "api_secret", null, 10000, false, tagOptions[0], "/api/files", ConnectionType.SFTP),
            new Connection("9", "Media CDN Storage", "media.cdn.io", 22, "media", null, "/certs/media.key", 10000, false, null, "/cdn/media", ConnectionType.S3),
            new Connection("10", "Temporary Workspace", "temp.workspace.local", 22, "temp_user", "temp123", null, 10000, true, tagOptions[2], "/tmp", ConnectionType.FTP),
            new Connection("10", "Temporary Workspace", "temp.workspace.local", 22, "temp_user", "temp123", null, 10000, true, tagOptions[2], "/tmp", ConnectionType.FTP),
            new Connection("10", "Temporary Workspace", "temp.workspace.local", 22, "temp_user", "temp123", null, 10000, true, tagOptions[2], "/tmp", ConnectionType.FTP),
            new Connection("10", "Temporary Workspace", "temp.workspace.local", 22, "temp_user", "temp123", null, 10000, true, tagOptions[2], "/tmp", ConnectionType.FTP)
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