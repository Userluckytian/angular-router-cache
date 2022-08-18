import { Injector, ViewContainerRef, ViewRef } from "@angular/core";
import { SpinContainerComponent } from "./components/spin-container/spin-container.component";

// The Factory function
const spinFactory = (viewRef: ViewRef, ref: ViewContainerRef) => {
    const factory = ref.createComponent(SpinContainerComponent);
    // const vierRef = factory.hostView;
    factory.instance.vc.insert(viewRef);
};
// The FactoryProvider
export const spinProvider = {
    provide: 'test',
    useFactory: spinFactory,
    deps: [ViewRef, ViewContainerRef]
}