import { Component, Prop, Element, State, Method, Event, EventEmitter } from "@stencil/core";

@Component({
	tag: "bab-expand",
	styleUrl: "bab-expand.scss",
})
export class BabExpand {
	@Element() container: HTMLElement;
	
	private initialStats:any;
	private mainElement:HTMLElement;
	private closeButtonElement:HTMLElement;
	private verticalClass:string;
	private horizontalClass:string;
	
	@Prop() event:string;
	@Prop() classes:string;
	@Prop() duration:number = 600;
	@Prop() verticalAlign:string = "center";
	@Prop() horizontalAlign:string = "center";
	@Prop() closeButton:boolean = true;
	
	@State() isOpen:boolean = false;
	@State() showCloseButton:boolean = false;	
	
	@Event() componentWillExpand: EventEmitter;
	@Event() componentDidExpand: EventEmitter;
	@Event() componentWillShrink: EventEmitter;
	@Event() componentDidShrink: EventEmitter;


	componentWillLoad(){
		this.checkAlignment();
	}
	checkAlignment(){
		switch (this.verticalAlign) {
			case "top":
			this.verticalClass = "bab-expand__vertical--top"
			break;
			case "bottom":
			this.verticalClass = "bab-expand__vertical--bottom"
			break;
			default:
			this.verticalClass = "bab-expand__vertical--center"
			break;
		}
		switch (this.horizontalAlign) {
			case "left":
			this.horizontalClass = "bab-expand__horizontal--left"
			break;
			case "right":
			this.horizontalClass = "bab-expand__horizontal--right"
			break;
			default:
			this.horizontalClass = "bab-expand__horizontal--center"
			break;
		}
	}	
	componentDidLoad(){
		

		this.mainElement = this.container.querySelector(".bab-expand");
		this.closeButtonElement = this.container.querySelector(".bab-expand__close");
		
		if(this.event){
			this.container.addEventListener(this.event, (e)=>{
				if(e.target !== this.closeButtonElement && !this.isOpen){
					this.expand();
				}
			});
		}
	}
	@Method()
	expand(){
		this.componentWillExpand.emit();		
		this.isOpen = true;
		this.initialStats = this.mainElement.getBoundingClientRect();
		const styles:any = this.mainElement.style;
		this.prepareExpansion(styles);
		setTimeout(() => {
			this.executeExpansion();
		}, 100);
	}	
	prepareExpansion(styles:any){
		this.mainElement.classList.add("bab-expand__fixed");
		styles.top = `${this.initialStats.top}px`;
		styles.left = `${this.initialStats.left}px`;
		styles.width = `${this.initialStats.width}px`;
		styles.height = `${this.initialStats.height}px`;
		styles.transition = `width ${this.duration}ms cubic-bezier(0.25, 0.8, 0.25, 1), height ${this.duration}ms cubic-bezier(0.25, 0.8, 0.25, 1), top ${this.duration}ms cubic-bezier(0.25, 0.8, 0.25, 1), left ${this.duration}ms cubic-bezier(0.25, 0.8, 0.25, 1)`;
	}
	executeExpansion(){
		this.mainElement.classList.add("bab-expand__coordinates");
		this.showCloseButton = true;
		setTimeout(() => {
			this.componentDidExpand.emit();
		}, this.duration);
	}
	@Method()
	shrink(){
		this.componentWillShrink.emit();
		this.showCloseButton = false;
		this.mainElement.classList.remove("bab-expand__coordinates");
		setTimeout(() => {
			this.removeStyleProperty();
		}, this.duration);
	}
	removeStyleProperty(){
		this.mainElement.removeAttribute("style");
		this.mainElement.classList.remove("bab-expand__fixed");
		this.isOpen = false;
		this.componentDidShrink.emit();
	}
	render() {
		return (
			<div class={"bab-expand "+this.classes+" "+ this.verticalClass +" "+this.horizontalClass}>
				<slot />
				{this.closeButton ? 
					<button class={'bab-expand__close ' + (this.showCloseButton ? 'show' : '')} onClick={()=> this.shrink()}>&#x2716;</button> : null}
				
			</div>
			);
		}		
	}
	