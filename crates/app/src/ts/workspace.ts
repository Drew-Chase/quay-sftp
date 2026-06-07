import {Connection} from "./connection.ts";


export const workspaceColors = [
    "#983498",
    "#208e20",
    "#1a1a8c",
    "#932c1b",
    "#ff0000",
    "#0d8585",
    "#ff8000",
    "#8000ff",
    "#0080ff",
    "#5ba814"
];

export class Workspace
{
    private readonly _id: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _color: string;


    constructor(id: string, name: string, description: string, color: string)
    {
        this._id = id;
        this._name = name;
        this._description = description;
        this._color = color;
    }

    get id(): string
    {
        return this._id;
    }

    get name(): string
    {
        return this._name;
    }

    get description(): string
    {
        return this._description;
    }

    get color(): string
    {
        return this._color;
    }

    async connections(): Promise<Connection[]>
    {
        return Connection.fetch_from_workspace(this._id);
    }

    async publish(){
        // TODO: Implement workspace publishing logic
    }

    static async fetch(): Promise<Workspace[]>
    {
        // TODO: Implement fetching workspaces logic
        return [
            new Workspace("eLP3ag0YpyA", "Personal Workspace", "My personal workspace", workspaceColors[0])
        ];
    }


}