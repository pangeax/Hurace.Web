import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';

import { SkierDto } from 'src/app/dtos';
import { GetAllSkiers, NewSkier } from 'src/app/actions';
import { fullName } from 'src/app/util';
import { ApiResource, data } from 'src/app/models';

@Component({
    selector: 'app-skier-list',
    templateUrl: './skier-list.component.html',
    styleUrls: ['./skier-list.component.scss']
})
export class SkierListComponent implements OnInit {
    public skiers: ApiResource<SkierDto[]> = data([]);

    public filter = null;

    public get filteredSkiers(): SkierDto[] {
        if (this.skiers.kind == "Data") {
            if (this.filter == null) {
                return this.skiers.data;
            }

            const filter = this.filter.toLowerCase();
            return this.skiers.data.filter(s => fullName(s).toLowerCase().includes(filter));
        }

        return [];
    }

    constructor(
        private store: Store
    ) {
        store.select(s => s.skier.all)
            .subscribe(skiers => this.skiers = skiers);
    }

    ngOnInit() {
        this.store.dispatch(new GetAllSkiers());
    }

    public new() {
        this.store.dispatch(new NewSkier());
    }
}
