import { Component } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import * as moment from 'moment';

enum ImportType
{
	CUSTOMERS,
	PRODUCTS,
	PRODUCT_SALES,
	CUSTOMER_PRODUCT_RECOMMENDATIONS,
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ClientApp';

	hub: HubConnection;
	msg: string;

	ngOnInit()
	{
		this.connectHub();
		this.registerOnNotifyImportCompletion();
	}

	async connectHub()
	{
		try 
		{
			await this.hub.start();
			this.msg = 'Hub is connected';
		} catch (err)
		{
			this.msg = 'ERROR: ' + err;
		}
	}

	registerOnNotifyImportCompletion()
	{
		this.hub.on('NotifyImportCompletion', (date, files, importType) => {
			this.msg = `Import of type ${importType} for the date ${moment(date).format('YYYY-MM-DD')} and files ${files} has completed`;
		});
	}

	importFile()
	{
		let files = ['asda', 'iaga'];
		let importType = ImportType.PRODUCT_SALES;
		this.hub.invoke('ImportFiles', moment().format('YYYY-MM-DD'), files, importType);
	}
}
