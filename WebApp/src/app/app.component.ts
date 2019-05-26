import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import * as moment from 'moment';
import * as bootstrap from 'bootstrap';

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
export class AppComponent implements OnInit {
	title = 'ClientApp';

	ImportType = ImportType;

	hub: HubConnection;
	msg: string;

	filename: string;
	importType: ImportType;
	date: string;

	ngOnInit()
	{
		this.connectHub();
		this.registerOnNotifyImportCompletion();
	}

	async connectHub()
	{
		try
		{
			this.hub = new HubConnectionBuilder()
				.withUrl('https://localhost:5001/FileImport')
				.build();
			await this.hub.start();
		} catch (err)
		{
			this.msg = 'Sorry, a problem occured when connecting to the server.';
		}
	}

	registerOnNotifyImportCompletion()
	{
		this.hub.on('NotifyImportCompletion', (date, files, importType) => {
			this.msg = `Import of type ${importType} for date ${moment(date).format('YYYY-MM-DD')} and file ${files} has completed`;
		});
	}

	importFile()
	{
		let files = [this.filename];
		let date = moment(this.date).format('YYYY-MM-DD');
		this.hub.invoke('ImportFiles', date, files, this.importType);
	}
}
