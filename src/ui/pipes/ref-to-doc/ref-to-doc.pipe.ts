import { Pipe, PipeTransform } from "@angular/core";
import { DocumentReference, docData } from "@angular/fire/firestore";

@Pipe({
    name: "appRefToDoc",
    standalone: true,
})
export class RefToDocPipe implements PipeTransform {
    transform(ref: DocumentReference) {
        return docData(ref);
    }
}
