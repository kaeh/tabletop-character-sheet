import { Pipe, type PipeTransform } from "@angular/core";
import { type DocumentReference, docData } from "@angular/fire/firestore";

@Pipe({
	name: "appRefToDoc",
	standalone: true,
})
export class RefToDocPipe implements PipeTransform {
	transform(ref: DocumentReference) {
		return docData(ref);
	}
}
