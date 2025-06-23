import { Class } from "./class"
import { MyFile } from "./myFile"

export type folder = {
   Id : number
   Name: string
  userId : number
  Description : string
  Classes? :Class[]
 test ?:MyFile[]
}
