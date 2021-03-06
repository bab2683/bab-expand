/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface BabExpand {
    'classes': string;
    'closeButton': boolean;
    'duration': number;
    'event': string;
    'expand': () => void;
    'horizontalAlign': string;
    'shrink': () => void;
    'verticalAlign': string;
  }
  interface BabExpandAttributes extends StencilHTMLAttributes {
    'classes'?: string;
    'closeButton'?: boolean;
    'duration'?: number;
    'event'?: string;
    'horizontalAlign'?: string;
    'onComponentDidExpand'?: (event: CustomEvent) => void;
    'onComponentDidShrink'?: (event: CustomEvent) => void;
    'onComponentWillExpand'?: (event: CustomEvent) => void;
    'onComponentWillShrink'?: (event: CustomEvent) => void;
    'verticalAlign'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'BabExpand': Components.BabExpand;
  }

  interface StencilIntrinsicElements {
    'bab-expand': Components.BabExpandAttributes;
  }


  interface HTMLBabExpandElement extends Components.BabExpand, HTMLStencilElement {}
  var HTMLBabExpandElement: {
    prototype: HTMLBabExpandElement;
    new (): HTMLBabExpandElement;
  };

  interface HTMLElementTagNameMap {
    'bab-expand': HTMLBabExpandElement
  }

  interface ElementTagNameMap {
    'bab-expand': HTMLBabExpandElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
